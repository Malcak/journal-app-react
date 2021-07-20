import { types } from '../../types/types';
import {
  setError,
  removeError,
  startLoading,
  finishLoading,
} from '../../actions/ui';

describe('test on ui actions', () => {
  test('all functions should return their action', () => {
    const setErrorAction = setError('error');
    expect(setErrorAction).toEqual({
      type: types.uiSetError,
      payload: 'error',
    });

    const removeErrorAction = removeError();
    expect(removeErrorAction).toEqual({ type: types.uiRemoveError });

    const startLoadingAction = startLoading();
    expect(startLoadingAction).toEqual({ type: types.uiStartLoading });

    const finishLoadingAction = finishLoading();
    expect(finishLoadingAction).toEqual({ type: types.uiFinishLoading });
  });
});
