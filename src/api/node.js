import fetch from './config';

export default {
  getNode(nodeId) {
    return fetch.get('/node/content', {
      nodeId,
    });
  },
  createNode({ fatherId, content, desc }) {
    return fetch.post('/node/create', {
      fatherId,
      content,
      desc,
    });
  },
};
