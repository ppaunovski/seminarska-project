import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import { Form, Button } from "react-bootstrap";
import { storage, db } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { setDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";

function SubjectPage() {
  const location = useLocation();
  const { subject } = location.state;

  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [neededFile, setNeededFile] = useState({});

  const fileListRef = ref(storage, `${subject}/`);

  const uploadFile = async () => {
    if (file === null) return;

    const fileId = `${subject}/${file.name + v4()}`;

    const fileRef = ref(storage, fileId);

    uploadBytes(fileRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setFileList((prev) => [...prev, { url: url, name: file.name }]);

        const addDocument = async () => {
          await setDoc(
            doc(db, "subjects", `${subject}`, "files", `${file.name}`),
            {
              url: url,
              fileName: file.name,
            }
          );
        };

        addDocument();
      });
    });
  };

  useEffect(() => {
    const getFileNames = async () => {
      const data = await getDocs(collection(db, `subjects/${subject}/files`));
      setFileNames(data.docs.map((doc) => ({ ...doc.data() })));
      setRefresh(!refresh);
    };

    getFileNames();
    console.log("fileNames prv", fileNames);
  }, []);

  useEffect(() => {
    const getFileNames = async () => {
      const data = await getDocs(collection(db, `subjects/${subject}/files`));
      setFileNames(data.docs.map((doc) => ({ ...doc.data() })));
      setRefresh(!refresh);
    };

    getFileNames();
    console.log("fileNames prv", fileNames);
  }, []);

  useEffect(() => {
    listAll(fileListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          console.log("fileNames", fileNames);

          setNeededFile(fileNames.find((element) => element.url === url));
        });
      });
    });
  }, [refresh]);

  useEffect(() => {
    console.log(neededFile);
    if (neededFile) {
      setFileList((prev) => [
        ...prev,
        { url: neededFile.url, name: neededFile.fileName },
      ]);
    }
  }, [neededFile]);

  return (
    <>
      <Navigation />
      <h1 className="sub_page_title">{subject}</h1>
      <div className="sub_page_uploaded_files">
        <Form>
          <Form.Control
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          ></Form.Control>
          <Button onClick={uploadFile}></Button>
        </Form>
        <div className="sub_page_file">
          <li>
            {fileList.map((file) => {
              return (
                <ul key={file.url}>
                  <img src={file.url}></img>
                  <a href={file.url} target="_blank">
                    {file.name}
                  </a>
                </ul>
              );
            })}
          </li>
        </div>
      </div>
    </>
  );
}

export default SubjectPage;
