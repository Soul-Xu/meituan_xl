window.callbackId = 0

export default function(obj, callback) {
  let cmd = obj.cmd;
  let data = obj.data;

  if (callback) {
    let functionName = 'CALLBACK' + window.callbackId
    data.callbackFuncname = functionName;
    window[functionName] = callback;
  }

  let url = 'jsbridge://' + cmd + '?c=' + JSON.stringify(data);

  let iframe = document.createElement('iframe');
  iframe.src = url;

  document.body.appendChild(iframe)

  window.setTimeout(() => {
    document.body.romoveChild(iframe)

  }, 1000);
  window.callbackId++;
}