import { useEffect, useCallback, useState } from 'react';
import sdk, { type Context } from '@farcaster/frame-sdk';
import { Button } from './ui/Button';

export default function Demo() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<Context.FrameContext>();
  const [isContextOpen, setIsContextOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      setContext(await sdk.context);
      sdk.actions.ready();
    };
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  const toggleContext = useCallback(() => {
    setIsContextOpen((prev) => !prev);
  }, []);

  const openUrl = useCallback(() => {
    sdk.actions.openUrl('https://www.enkrypt.com/');
  }, []);

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className='mx-auto w-[300px] px-2 py-4'>
      <h1 className='mb-4 text-center text-2xl font-bold'>Frames v2 Demo</h1>

      <div className='mb-4'>
        <h2 className='font-2xl font-bold'>Context</h2>
        <button
          onClick={toggleContext}
          className='flex items-center gap-2 transition-colors'>
          <span
            className={`transform transition-transform ${
              isContextOpen ? 'rotate-90' : ''
            }`}>
            ➤
          </span>
          {''}
          Tap to expand
        </button>

        {isContextOpen && (
          <div className='mt-2 rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
            <pre className='overflow-x- max-w-[260px] whitespace-pre-wrap break-words font-mono text-xs'>
              {JSON.stringify(context, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <div>
        <h2 className='font-2xl font-bold'>Actions</h2>

        <div className='mb-4'>
          <div className='my-2 rounded-lg bg-gray-100 p-2 dark:bg-gray-800'>
            <pre className='overflow-x- max-w-[260px] whitespace-pre-wrap break-words font-mono text-xs'>
              sdk.actions.openUrl
            </pre>
          </div>
          <Button onClick={openUrl}>Open Link</Button>
        </div>
      </div>
    </div>
  );
}
