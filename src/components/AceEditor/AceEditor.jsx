import React, { useState, useEffect, useCallback } from 'react';
import AceEditor from 'react-ace';
import { Button } from 'semantic-ui-react';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';

export default function App() {
  // boolean that determines what text savingIcon will display
  const [savingState, setSavingState] = useState(false);

  // number displayed to let user know how long it's been since they made an edit
  const [timeSinceLastEdit, setTimeSinceLastEdit] = useState(0);

  // string that represents all the text within the editor
  const [editorState, setEditorState] = useState('');

  // array that will hold objects that hold information on previous states of the editor (auto/manual save, editor text, time it was saved)
  const [savedVersions, setSavedVersions] = useState([]);

  // two possibilities based on savingState
  function savingIcon(isSaving) {
    let savingStatus;
    if (isSaving) {
      savingStatus = 'Saving...';
    } else {
      savingStatus = 'Saved to Cloud';
    }

    return <p id="save-icon">{savingStatus}</p>;
  }

  // called every time the editorState dependency is changed
  useEffect(() => {
    // resets the time since the last edit to zero
    setTimeSinceLastEdit((time) => (time = 0));

    // starts a new Interval that increments the state of timeSinceLastEdit at a given interval
    const editInterval = setInterval(() => {
      setTimeSinceLastEdit((time) => time + 1);
    }, 1000);

    // clears the interval so that only one interval is counting at a time
    return () => clearInterval(editInterval);
  }, [editorState]);

  // edited lastEdit to be in seconds to show functionality
  function lastEdit(sec) {
    return <p> Last Edit was {sec} seconds ago</p>;
  }

  // did not edit this at all
  function fakeAPICall(editorText, callback) {
    setTimeout(() => {
      callback(null, { data: { savedQuery: editorText } });
    }, 500);
  }

  // function callNewSave(editorText, callback) {
  //   setSavingState(true);

  //   fakeAPICall(editorText, (err, data) => {
  //     const newVersion = {
  //       autoSaved: false,
  //       content: editorText,
  //       savedTime: new Date().getTime(),
  //     };

  //     setSavedVersions((prevVersions) => [...prevVersions, newVersion]);

  //     setSavingState(false);
  //   });
  // }

  function callNewSave(editorText, callback) {
    // makes savingIcon show 'Saving...'
    setSavingState(true);

    // refactored to make use of the callback and catch possible errors
    fakeAPICall(editorText, (err, data) => {
      if (err) {
        console.log('Error: ', err);
      } else {
        const newVersion = {
          autoSaved: false,
          content: data.data.savedQuery,
          savedTime: new Date().getTime(),
        };

        // update state of savedVersions with new save information
        setSavedVersions((prevVersions) => [...prevVersions, newVersion]);

        // reset saveIcon
        setSavingState(false);
      }
    });
  }

  // so that the editor only autosaves x amount of seconds after user has stopped typing
  function debounce(func, timeout) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  const debouncedAutoSave = useCallback(
    debounce((editorText) => {
      callAutoSave(editorText);
    }, 2000),
    []
  );

  // could have refactored this to catch errors and make use of callback data as well
  // otherwise, does the same thing as callNewSave()
  function callAutoSave(editorText, callback) {
    setSavingState(true);
    fakeAPICall(editorText, (err, data) => {
      const newVersion = {
        autoSaved: true,
        content: editorText,
        savedTime: new Date().getTime(),
      };

      setSavedVersions((prevVersions) => [...prevVersions, newVersion]);

      setSavingState(false);
    });
  }

  // edited mostly styling of displaySavedVersions
  function displaySavedVersions(versions) {
    if (!versions.length) return <p>No saved versions...</p>;

    // added the index parameter to the .map to provide the React elements with unique keys
    return versions.map((save, i) => {
      return (
        <div
          key={i}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: 'none',
            backgroundColor: 'white',
          }}
        >
          <p style={{ margin: 0 }}>
            Save type: <strong>{save.autoSaved ? 'Auto' : 'Manual'}</strong>
          </p>
          <p style={{ margin: 0 }}>
            Content: <strong>{save.content}</strong>
          </p>
          <p style={{ margin: 0 }}>
            Saved Time: <strong>{save.savedTime}</strong>
          </p>
        </div>
      );
    });
  }

  return (
    <div id="synced-editor">
      {savingIcon(savingState)}
      {timeSinceLastEdit ? lastEdit(timeSinceLastEdit) : lastEdit(0)}

      <AceEditor
        mode="java"
        theme="github"
        value={editorState}
        // updates editorState every time user types/backspaces
        onChange={(e) => {
          // not very familiar with Ace editor, but it seems like the event itself holds the text within the editor
          setEditorState(e);
          debouncedAutoSave(e);
        }}
      />

      <Button
        onClick={() => {
          callNewSave(editorState);
        }}
      >
        Save a Version
      </Button>

      <div
        style={{
          backgroundColor: 'whitesmoke',
          display: 'flex',
          flexDirection: 'column',
          padding: '1em',
          margin: '1em',
          gap: '1em',
        }}
      >
        <h3 style={{ margin: 0 }}>Saved Versions:</h3>
        {savedVersions.length
          ? [displaySavedVersions(savedVersions)]
          : 'No saved versions to show'}
      </div>
    </div>
  );
}
