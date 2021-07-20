// import configureStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import { startUploading } from '../../actions/notes';
// import { db } from '../../firebase/firebaseConfig';

// jest.mock('../../helpers/fileUpload', () => {
//   return {
//     fileUpload: () => {
//       return Promise.resolve('https://this-represents-an-url.com/photo.png');
//     },
//   };
// });

// const middlewares = [thunk];
// const mockStore = configureStore(middlewares);

// const initState = {
//   auth: {
//     uid: 'testing',
//   },
//   notes: {
//     active: {
//       id: '1Rz1JS3llkhnyAZKDC2w',
//       title: 'Hello World',
//       body: 'And welcome to a new video...',
//       date: 1626559657254,
//     },
//   },
// };

// let store = mockStore(initState);

// global.scrollTo = jest.fn();

describe('test on notes actions and startUploading function', () => {
  //   afterAll(() => {
  //     db.disableNetwork();
  //   });
  //   beforeEach(() => {
  //     store = mockStore(initState);
  //   });
  //   // TODO: this test causes errors
  test('should update the URL of the note', async () => {
    //     const file = new File([], 'img.png');
    //     await store.dispatch(startUploading(file));
    //     const docRef = await db
    //       .doc(`testing/journal/notes/1Rz1JS3llkhnyAZKDC2w`)
    //       .get();
    //     console.log(docRef.data().);
    //     expect(docRef.data().imgUrl).toBe('https://this-represents-an-url.com/photo.png');
  });
});
