import React, { useState, useEffect } from 'react';
import db from './firebase-config'
import firebase from 'firebase/compat/app';
import './App.css';

const App = () => {
  const [userInfo, setuserInfo] = useState({
    title: '',
    description: '',
  });
  const [isUsers, setUsers] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [isEdit, setEdit] = useState(null);
  const onChangeValue = (e) => {
    setuserInfo({
      ...userInfo,
      [e.target.name]:e.target.value
    });
  } 
{/* Fetch ------------------------------------------- */}  
  useEffect(() => {
    db.collection('users').orderBy('datetime', 'desc').onSnapshot(snapshot => {
      setUsers(snapshot.docs.map(doc => {
        return {
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          datetime: doc.data().datetime
        }
      }))
    })
  }, []);
{/* Insert ------------------------------------------- */}
  const addlist = async(event) => {
    try {
      event.preventDefault();
      await db.collection('users').add({
        title: userInfo.title,
        description: userInfo.description,
        datetime: firebase.firestore.FieldValue.serverTimestamp()
      })
      setuserInfo({...userInfo,
        title:'',
        description: '',
      });
    } catch (error) { throw error;}  
  }
{/* Edit ------------------------------------------- */}
  const Update = (items) => {
    setOpen(true);
    setEdit(items.id);
    setuserInfo({...userInfo,
      title:items.title,
      description: items.description,
    });
  }
  const editlist = async(event) => {
    try {
      event.preventDefault();
      db.collection('users').doc(isEdit).update({
        title: userInfo.title,
        description: userInfo.description,
      });
      setOpen(false);
      setEdit(null);
      setuserInfo({...userInfo,
        title:'',
        description: '',
      });
    } catch (error) { throw error;}  
  }
{/* Delete ------------------------------------------- */}
  const Delete = (id) => {
    db.collection('users').doc(id).delete().then(res => {
      console.log('Deleted!', res);
    });
  }
  
  return (<>
    <div className="App">
      <h1> React Firebase Firestore CRUD Operations </h1>
      <div className="wrapper">
        {/* Insert users -------------------------------------------*/}
        {isOpen === false &&
          <form onSubmit={addlist}>
            <input type="text" id="title"  name="title" value={userInfo.title} onChange={onChangeValue} placeholder=" Title " required />
            <textarea id="desc" name="description" value={userInfo.description} onChange={onChangeValue} placeholder=" Description "  />
            <button type="submit" className="btn__default btn__add" > Add </button>  
          </form>
        } 
      </div>
      {/* Fetch users ------------------------------------------------*/}
      {isUsers.map((items,index) => (
        <div key={items.id} >
          <div className="wrapper__list">
            <p><b> Title : </b> {items.title}</p>
            <p><b> Description : </b>{items.description}</p>
            <p><b> Date : </b>{items.datetime?.toDate().toLocaleDateString("en-US")}</p>  
            <div className="update__list"> 
              <button onClick={()=>Update(items)}  className="btn__default btn__edit"> Edit </button>
              <button onClick={()=>Delete(items.id)}  className="btn__default btn__delete"> delete </button>
            </div>
            {/* Edit users ------------------------------------------- */}
            {isOpen === true && isEdit === items.id &&
              <form onSubmit={editlist}>
                <input type="text" id="title"  name="title" value={userInfo.title} onChange={onChangeValue} placeholder=" Title " required />
                <textarea id="desc" name="description" value={userInfo.description} onChange={onChangeValue} placeholder=" Description "  />
                <button type="submit" className="btn__default btn__add" > Save </button>  
              </form>
            }           
          </div>    
        </div>
      ))}
    </div>
  </>)
}

export default App
