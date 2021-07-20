import { types } from '../../types/types';

describe('test on types', () => {
  test('should be equal', () => {
    expect(types).toEqual({
      login: '[auth] login',
      logout: '[auth] logout',

      uiSetError: '[ui] setError',
      uiRemoveError: '[ui] removeError',

      uiStartLoading: '[ui] startLoading',
      uiFinishLoading: '[ui] finishLoading',

      notesAddEntry: '[notes] newNote',
      notesActive: '[notes] activeNote',
      notesLoad: '[notes] loadNotes',
      notesUpdate: '[notes] updateNotes',
      notesFileUrl: '[notes] updateFileUrl',
      notesDelete: '[notes] deleteNote',
      notesLogoutClean: '[notes] logoutClean',
    });
  });
});
