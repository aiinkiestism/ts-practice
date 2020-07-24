import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import * as Module from './../../wasm/fibonacci.js';
import '!!file-loader?name=wasm/fibonacci.wasm!../../wasm/fibonacci.wasm';


@Injectable({
  providedIn: 'root'
})
export class WasmService {
  module: any;
  wasmReady = new BehaviorSubject<boolean>(false);

  constructor() {
    this.instantiateWasm('wasm/fibonacci.wasm');
  }

  private async instantiateWasm(url: string) {
    const wasmFile = await fetch(url);

    const buffer = await wasmFile.arrayBuffer();
    const binary = new Uint8Array(buffer);

    const moduleArgs = {
      wasmBinary: binary, onRuntimeInitialized: () => {
        this.wasmReady.next(true)
      },
    };

    this.module = Module(moduleArgs);

  }

  public fibonacci(input: number): Observable<number> {
    return this.wasmReady.pipe(filter(value => value = true)).pipe (
      map(() => {
        return this.module._fibonacci(input);
      })
    )
  }
}
