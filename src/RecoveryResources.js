import { useState, useEffect } from 'react';
import { db, auth } from './firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

function RecoveryPlan() {
  const [goal, setGoal] = useState('');
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState('');

  const handleAddGoal = async (e) => {
    e.preventDefault();
    if (!goal.trim()) {
      setError('Goal cannot be empty');
      return;
    }
    try {
      const user = auth.currentUser;
      if (user) {
        await addDoc(collection(db, 'recoveryPlans'), {
          userId: user.uid,
          goal: goal,
          timestamp: new Date(),
          completed: false
        });
        setGoal('');
        setError('');
        fetchPlans();
      }
    } catch (e) {
      setError('Error adding goal: ' + e.message);
    }
  };

  const fetchPlans = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const q = query(collection(db, 'recoveryPlans'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const plansList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPlans(plansList);
      }
    } catch (e) {
      setError('Error fetching plans: ' + e.message);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Recovery Plans</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleAddGoal} className="mb-4">
        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Add a recovery goal (e.g., 'Attend a meeting weekly')"
          className="w-full p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-300"
        >
          Add Goal
        </button>
      </form>
      <ul className="list-disc pl-5 text-gray-600">
        {plans.map(plan => (
          <li key={plan.id} className="mb-2">
            <span className="font-medium">{plan.goal}</span> - {plan.completed ? 'Completed' : 'In Progress'} (Added: {new Date(plan.timestamp.toDate()).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecoveryPlan;