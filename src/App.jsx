import { useState } from 'react'
import './App.css'

import { WebChatContainer } from '@ibm-watson/assistant-web-chat-react';

const webChatOptions = {
  integrationID: 'bd306ec0-5323-4dcd-83a0-3bcdca73f919',
  region: 'us-east',
  serviceInstanceID: 'f0b04de6-aed8-48ee-9d0e-985fcf06795a',
  // subscriptionID: 'only on enterprise plans',
  // Note that there is no onLoad property here. The WebChatContainer component will override it.
  // Use the onBeforeRender or onAfterRender prop instead.
};

function App() {
  const [instance, setInstance] = useState(null);

  const specialToken = 'ghsdf729'

  const preSendHandler = (event) => {
    event.data.context.skills['actions skill'].skill_variables.Special_Token = specialToken;
    console.log("event.data.context", event.data.context)
  }

  return (
    <>
      <h1>Watson embedding PoC</h1>
      <p>The token is: {specialToken}</p>
      <p>Ask the assistant "Show me the token" to verify.</p>

      <WebChatContainer config={webChatOptions} onBeforeRender={(instance) => onBeforeRender(instance, setInstance, preSendHandler)}/>
    </>
  )
}

const onBeforeRender = (instance, setInstance, preSendHandler) => {
  setInstance(instance);

  instance.on({ type: 'pre:send', handler: preSendHandler });
}

export default App
