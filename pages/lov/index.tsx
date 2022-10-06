import React, { useState } from 'react';

import FirebaseCloudMessaging from 'utils/firebase';

function truncate(
  fullStr: string,
  strLen = 20,
  separator = '...........',
  frontChars = 10,
  backChars = 10,
) {
  if (fullStr.length <= strLen) return fullStr;

  return (
    fullStr.substr(0, frontChars) +
    separator +
    fullStr.substr(fullStr.length - backChars)
  );
}
const LovComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [finish, setFinish] = useState(false);

  const [token, setToken] = useState('');
  React.useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('./firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Registration successful, scope is:', registration.scope);
        })
        .catch((err) => {
          console.log('Service worker registration failed, error:', err);
        });
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('event for the service worker', event);
      });
    }

    async function setTokenFunc() {
      try {
        const d = new FirebaseCloudMessaging();
        const tk = await FirebaseCloudMessaging.init(d.app);
        if (tk) {
          console.log('token', tk);
          setToken(String(tk));
          //   getMessage();
        }
      } catch (error) {
        console.log(error);
      }
    }
    setTokenFunc();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center h-60">
        {true ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              className="max-w-md h-auto"
              src="https://media2.giphy.com/media/dYZxsY7JIMSy2Afy6e/giphy.gif?cid=ecf05e47asq1b2cujas5mgbjm1i53l1tfka38kgu54o17126&rid=giphy.gif&ct=g"
              alt="description"
            />
            <button
              className="px-6 py-3 text-purple-100 bg-purple-600 rounded-md"
              type="button"
              onClick={() => setShowModal(true)}
            >
              Bé nhấp vào đây nè
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p>Em đợi nó load một tí nha!!3 </p>
            <div role="status">
              <svg
                aria-hidden="true"
                className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </div>
      {showModal ? (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div
            role="presentation"
            className="fixed inset-0 w-full h-full bg-black opacity-40"
            onClick={() => setShowModal(false)}
          />
          <div className="flex items-center min-h-screen px-4 py-8">
            <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
              <div className="mt-3">
                <div className="flex items-center justify-center flex-none w-50 h-50 mx-auto bg-red-100 rounded-full">
                  <img
                    className="max-w-md h-auto"
                    src={
                      finish
                        ? 'https://media4.giphy.com/media/l4FGzTDDUZ3OPorFS/giphy.gif?cid=ecf05e47asq1b2cujas5mgbjm1i53l1tfka38kgu54o17126&rid=giphy.gif&ct=g'
                        : 'https://media0.giphy.com/media/xT9IgAWzvvcohEMofu/giphy.gif?cid=ecf05e47asq1b2cujas5mgbjm1i53l1tfka38kgu54o17126&rid=giphy.gif&ct=g'
                    }
                    alt="description"
                  />
                </div>
                <div className="mt-2 text-center sm:ml-4 sm:text-left">
                  <h4 className="text-lg font-medium text-gray-800">
                    {finish
                      ? 'ròi á, em bấm đóng được rùi í. <3'
                      : 'Copy cái này gửi anh nha? có cái nút ở dưới á. :3'}
                  </h4>
                  <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                    yêu em
                  </p>
                  <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                    {truncate(token)}
                  </p>
                  <div className="items-center gap-2 mt-3 sm:flex">
                    {/* <button
                      type="button"
                      className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                      onClick={() => setShowModal(false)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button> */}
                    <button
                      type="button"
                      className="w-full mt-2 p-2.5 flex-1 text-blue-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                      onClick={() => {
                        if (finish) {
                          window.close();
                        } else {
                          navigator.clipboard.writeText(token);
                          // setShowModal(false);
                          setFinish(true);
                        }
                      }}
                    >
                      {finish ? 'close' : 'copy'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default LovComponent;
