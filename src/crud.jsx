import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from './firebase';
// import Sign from './components/auth'; // Uncomment if you need this component

function Crud() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState(''); // Initialize as empty string
  const [age, setAge] = useState(0); // Initialize as number
  const userCollectionRef = collection(db, 'users');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getDocs(userCollectionRef);
        const usersList = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUsers(usersList);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [userCollectionRef]); // Add userCollectionRef here

  const createUser = async () => {
    try {
      await addDoc(userCollectionRef, { name: name, age: age });
      setName(''); // Clear input after adding
      setAge(0); // Reset age input
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const increase = async (id, currentAge) => {
    try {
      const userDoc = doc(db, 'users', id);
      const newFields = { age: currentAge + 1 };
      await updateDoc(userDoc, newFields);
    } catch (error) {
      console.error('Error updating user age:', error);
    }
  };

  return (
    <div>
      <div>{/* <Sign /> */}</div>
      {/* CRUD Stuff */}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Your age"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))} // Convert to number
      />
      <button onClick={createUser}>Create Now</button>

      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.id}>
            <h1>Name: {user.name}</h1>
            <p>Age: {user.age}</p>
            <button onClick={() => increase(user.id, user.age)}>
              Increase age
            </button>
            <hr />
          </div>
        ))
      ) : (
        <p>No users found.</p>
      )}
      <div>CRUD Stuff</div>
    </div>
  );
}

export default Crud;
