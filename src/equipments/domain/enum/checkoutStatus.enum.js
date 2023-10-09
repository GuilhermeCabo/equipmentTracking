import { Enum } from '../../../shared/domain/enum/enum.js';

export const checkoutStatusEnum = Enum.build({
  ON_GOING: 'ongoing',
  FINISHED: 'finished',
});
