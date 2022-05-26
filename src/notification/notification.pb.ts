/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import * as Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';

export const protobufPackage = 'notification';

export interface ListRequest {
  userId: number;
}

export interface ListResponse {
  data: Data[];
}

export interface Data {
  id: number;
  header: string;
  message: string;
}

export const NOTIFICATION_PACKAGE_NAME = 'notification';

export interface NotificationServiceClient {
  list(request: ListRequest): Observable<ListResponse>;
}

export interface NotificationServiceController {
  list(
    request: ListRequest,
  ): Promise<ListResponse> | Observable<ListResponse> | ListResponse;
}

export function NotificationServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['list'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('NotificationService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('NotificationService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const NOTIFICATION_SERVICE_NAME = 'NotificationService';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
