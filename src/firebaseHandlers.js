import { v4 as uuidv4 } from "uuid";
import db from "./firebaseConfig";

export const handleAddEntry = async (
  selectedCategory,
  timeSpent,
  selectedDate,
  setTimeEntries,
  timeEntries,
  setSelectedCategory,
  setTimeSpent,
  setSelectedDate
) => {
  if (!selectedCategory || !timeSpent || !selectedDate) return;

  try {
    const newEntryId = uuidv4();
    await db.collection("timeEntries").doc(newEntryId).set({
      category: selectedCategory,
      timeSpent: parseInt(timeSpent),
      date: selectedDate,
    });

    const updatedTimeEntries = [
      ...timeEntries,
      {
        id: newEntryId,
        category: selectedCategory,
        timeSpent,
        date: selectedDate,
      },
    ];
    setTimeEntries(updatedTimeEntries);

    setSelectedCategory("");
    setTimeSpent("");
    setSelectedDate("");
  } catch (error) {
    console.error("Ошибка при добавлении записи:", error);
  }
};

export const handleDeleteEntry = async (id, setTimeEntries, timeEntries) => {
  try {
    await db.collection("timeEntries").doc(id).delete();

    const updatedEntries = timeEntries.filter((entry) => entry.id !== id);
    setTimeEntries(updatedEntries);
  } catch (error) {
    console.error("Ошибка при удалении записи:", error);
  }
};

export const handleEditTime = (
  id,
  setModalOpen,
  setNewTime,
  timeEntries,
  setSelectedEntryId
) => {
  setSelectedEntryId(id);
  setModalOpen(true);
  const entryToUpdate = timeEntries.find((entry) => entry.id === id);
  setNewTime(entryToUpdate.timeSpent.toString());
};

export const handleSaveTime = async (
  newTime,
  selectedEntryId,
  setModalOpen,
  setNewTime,
  timeEntries,
  setTimeEntries
) => {
  if (!newTime || !selectedEntryId) return;

  try {
    const updatedTime = parseInt(newTime);

    await db.collection("timeEntries").doc(selectedEntryId).update({
      timeSpent: updatedTime,
    });

    const updatedEntries = timeEntries.map((entry) => {
      if (entry.id === selectedEntryId) {
        return { ...entry, timeSpent: updatedTime };
      } else {
        return entry;
      }
    });
    setTimeEntries(updatedEntries);

    setModalOpen(false);

    setNewTime("");
  } catch (error) {
    console.error("Ошибка при сохранении времени:", error);
  }
};

export const handleAddCategories = async () => {
  try {
    await db.collection("categories").doc("1").set({ name: "Стажировка" });
    await db.collection("categories").doc("2").set({ name: "Личное" });
    await db.collection("categories").doc("3").set({ name: "Учеба" });
  } catch (error) {
    console.error("Ошибка при добавлении категорий:", error);
  }
};