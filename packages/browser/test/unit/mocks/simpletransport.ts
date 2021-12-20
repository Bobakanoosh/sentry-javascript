import { eventStatusFromHttpCode, makeSyncPromise } from '@sentry/utils';

import { Event, Response } from '../../../src';
import { BaseTransport } from '../../../src/transports';

export class SimpleTransport extends BaseTransport {
  public sendEvent(_: Event): PromiseLike<Response> {
    return this._buffer.add(() =>
      makeSyncPromise().resolve({
        status: eventStatusFromHttpCode(200),
      }),
    );
  }
}
