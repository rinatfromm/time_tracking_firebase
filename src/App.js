import React, { useState, useEffect } from "react";
import "firebase/compat/firestore";
import TimeEntryForm from "./components/timeEntryForm/TimeEntryForm";
import TimeEntriesTable from "./components/timeEntriesTable/TimeEntriesTable";
import EditTimeModal from "./components/modal/Modal";
import "./App.css";
import db from "./firebaseConfig";
import {
  handleAddEntry,
  handleDeleteEntry,
  handleEditTime,
  handleSaveTime,
  handleAddCategories,
} from "./firebaseHandlers";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [timeEntries, setTimeEntries] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [timeSpent, setTimeSpent] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [newTime, setNewTime] = useState("");
  const [selectedEntryId, setSelectedEntryId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesSnapshot = await db.collection("categories").get();
        const categoriesData = categoriesSnapshot.docs.map(
          (doc) => doc.data().name
        );
        setCategories(categoriesData);

        const timeEntriesSnapshot = await db.collection("timeEntries").get();
        const timeEntriesData = timeEntriesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTimeEntries(timeEntriesData);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [db]);

  useEffect(() => {
    handleAddCategories();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <TimeEntryForm
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        timeSpent={timeSpent}
        setTimeSpent={setTimeSpent}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        handleAddEntry={() =>
          handleAddEntry(
            selectedCategory,
            timeSpent,
            selectedDate,
            setTimeEntries,
            timeEntries,
            setSelectedCategory,
            setTimeSpent,
            setSelectedDate
          )
        }
        categories={categories}
      />

      <TimeEntriesTable
        timeEntries={timeEntries}
        handleDeleteEntry={(id) =>
          handleDeleteEntry(id, setTimeEntries, timeEntries)
        }
        handleEditTime={(id) =>
          handleEditTime(id, setModalOpen, setNewTime, timeEntries, setSelectedEntryId)
        }
      />

      <EditTimeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={() =>
          handleSaveTime(
            newTime,
            selectedEntryId,
            setModalOpen,
            setNewTime,
            timeEntries,
            setTimeEntries
          )
        }
        newTime={newTime}
        setNewTime={setNewTime}
      />
    </div>
  );
};

export default App;