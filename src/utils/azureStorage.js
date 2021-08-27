import { BlobServiceClient } from '@azure/storage-blob'

const baseUrl = "https://mjmpictures.blob.core.windows.net"

// Make sure to hide token away
const token = "?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacuptfx&se=2021-08-30T09:45:15Z&st=2021-08-27T01:45:15Z&spr=https,http&sig=nRWKzmENPe1DsxTWhNQsmtNV8wGMbegXG2b51RF6iHc%3D";

const conString = `${baseUrl}/${token}`

const blobServiceClient = new BlobServiceClient(conString);

// Fetch JSON file for data
export const getJSONData = async () => {
    const url = `${baseUrl}/pics/images.json`;
    let jsonData;
    await fetch(url)
        .then(response => response.json())
        .then(data => jsonData = data)
    return jsonData
}

// Upload new content
export const uploadNewJsonFile = async (content, blobName) => {
    // 🐄 go moo 
    const containerClient = blobServiceClient.getContainerClient('pics');

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
}


const createBlobInContainer = async (containerClient, file) => {

    // create blobClient for container
    const blobClient = containerClient.getBlockBlobClient(file.name);

    // set mimetype as determined from browser with file upload control
    const options = { blobHTTPHeaders: { blobContentType: file.type } };

    // upload file
    await blobClient.uploadBrowserData(file, options);
}

export const uploadFileToBlob = async (file) => {
    if (!file) return [];

    // get Container - full public read access
    const containerClient = blobServiceClient.getContainerClient("pics");

    if (!containerClient.exists())
        await containerClient.createIfNotExists({
            access: 'container',
        });

    // upload file
    await createBlobInContainer(containerClient, file);
};


export const getAllContents = async (type = "pics") => {
    // Get contents from blob storage
    // Type: data, pics
    const containerClient = blobServiceClient.getContainerClient(type);

    if (!containerClient.exists())
        await containerClient.createIfNotExists({
            access: 'container',
        });
    // get list of blobs in container
    return getBlobsInContainer(containerClient);
}


export const getBlobsInContainer = async (containerClient) => {
    const returnedBlobUrls = [];

    for await (const blob of containerClient.listBlobsFlat()) {
        returnedBlobUrls.push(
            `${baseUrl}/pics/${blob.name}`
        );
    }

    return returnedBlobUrls;
}