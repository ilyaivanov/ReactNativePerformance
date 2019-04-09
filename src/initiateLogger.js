import MessageQueue from 'react-native/Libraries/BatchedBridge/MessageQueue';


let messageCount = 0;
const logSpy = (info) => {
  const fromTo = info.type === 0 ? 'TO JS: ' : 'TO NATIVE: ';
  const methodSignature = info.module + '.' + info.method + '(' + JSON.stringify(info.args) + ')';
  messageCount++;
  console.log(messageCount, fromTo, methodSignature);
};

MessageQueue.spy(logSpy);
