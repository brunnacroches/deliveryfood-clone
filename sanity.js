import { createClient } from '@sanity/client';
import imageUrlBuilder from "@sanity/image-url";
import 'react-native-url-polyfill/auto';

const client = createClient({
    projectId: "qwoxusny",
    dataset: "production",
    useCdn: true,
    apiVersion: '2023-05-03'
})

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

// RUN THIS to add exception for localhost 3000 CORS policy
// sanity cors add http://localhost:3000

export default client;