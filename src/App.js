import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute'

/* Import pages */
import Login from "./pages/Login";

import Cases from "./pages/Cases";
import Overview from "./pages/Overview";

import SocialProfile from "./pages/SocialProfile";
import Emails from "./pages/Emails";
import WebHistory from "./pages/WebHistory";
import DownloadHistory from "./pages/DownloadHistory";
import Chats from "./pages/Chats";
import Calls from "./pages/Calls";

import EmailViewer from "./pages/EmailViewer";
import CallViewer from "./pages/CallViewer";
import ChatViewer from "./pages/ChatViewer";
import SiteViewer from "./pages/SiteViewer";

import FinalReport from "./pages/FinalReport";
/* end pages */

import "bootstrap/dist/css/bootstrap.min.css";


// Dispatch to each page
function App() {
  // Page router dispatcher
  return (
      <Router>
        <Route path="/login/" component={ Login } />

        <PrivateRoute exact path="/" component={ Cases } />
        <PrivateRoute path="/overview/" component={ Overview } />
        <PrivateRoute path="/profile/" component={ SocialProfile } />
        <PrivateRoute path="/emails/" component={ Emails } />
        <PrivateRoute path="/web-history/" component={ WebHistory } />
        <PrivateRoute path="/chats/" component={ Chats } />
        <PrivateRoute path="/calls/" component={ Calls } />
        <PrivateRoute path="/email-viewer/" component={ EmailViewer } />
        <PrivateRoute path="/call-viewer/" component={ CallViewer } />
        <PrivateRoute path="/chat-viewer/" component={ ChatViewer } />
        <PrivateRoute path="/site-viewer/" component={ SiteViewer } />
        <PrivateRoute path="/downloads/" component={ DownloadHistory } />
        <PrivateRoute path="/final-report/" component={ FinalReport } />
      </Router>
  );
}

export default App;