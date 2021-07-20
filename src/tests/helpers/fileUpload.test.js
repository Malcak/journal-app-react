import cloudinary from 'cloudinary';
import { fileUpload } from '../../helpers/fileUpload';

cloudinary.config({
  cloud_name: 'malcak-media-cloud',
  api_key: '461436183286861',
  api_secret: 'JstfMU-cLeQmcxs-tuzkiwxwYb8',
  secure: true,
});

describe('test on fileUpload helper', () => {
  test('should load a file and return the file s URL', async () => {
    const resp = await fetch(
      'https://19yw4b240vb03ws8qm25h366-wpengine.netdna-ssl.com/wp-content/uploads/10-Free-To-Use-CORS-Proxies-1024x768.png'
    );
    const blob = await resp.blob();

    const file = new File([blob], 'foto.png');
    const url = await fileUpload(file);

    expect(typeof url).toBe('string');

    const segments = url.split('/');
    const imgId = segments[segments.length - 1].replace('.png', '');

    const { deleted } = await cloudinary.v2.api.delete_resources(imgId);
    expect(deleted).toEqual({ [imgId]: 'deleted' });
  });

  test('should return an error', async () => {
    const file = new File([], 'foto.png');
    const url = await fileUpload(file);

    expect(url).toEqual(null);
  });
});
