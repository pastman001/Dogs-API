import React, { useEffect, useState } from 'react';
import './style.css';

export const App = () => {
  const [imgUrl, setImgUrl] = useState('');
  const [store, setStore] = useState([]);
  const [currentOptionValue, setCurrentOptionValue] = useState('affenpinscher');

  const sendRequest = (breedName: string) => {
    let url = `https://dog.ceo/api/breed/${breedName}/images/random`;
    if (breedName === '') {
      url = 'https://dog.ceo/api/breeds/image/random';
    }
    return fetch(url)
      .then((response) => response.json())
      .then((result) => setImgUrl(result.message));
  };
  const sendRequestOne = () => {
    const url = 'https://dog.ceo/api/breeds/list/all';
    return fetch(url)
      .then((response) => response.json())
      .then((result) => setStore(result.message));
  };
  useEffect(() => {
    sendRequestOne();
    sendRequest('');
  }, []);
  const arr = [];
  for (const key in store) {
    arr.push(key);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const changeHandler = (e: any) => {
    return setCurrentOptionValue(e.target.value);
  };
  const test = () => {
    sendRequest(currentOptionValue);
  };
  return (
    <>
      <div className="notMain">
        <select onChange={changeHandler}>
          {arr.map((item) => {
            return (
              <option value={item} key={item}>
                {item}
              </option>
            );
          })}
        </select>
        <button onClick={test}>submit</button>
        <div>
          <button
            onClick={() => {
              sendRequest('');
            }}
          >
            Random
          </button>
        </div>
        <div>{imgUrl && <img className="img" src={imgUrl} alt="123"></img>}</div>
      </div>
    </>
  );
};
