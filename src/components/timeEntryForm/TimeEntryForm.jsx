import styles from './TimeEntryForm.module.css'

const TimeEntryForm = ({
    selectedCategory,
    setSelectedCategory,
    timeSpent,
    setTimeSpent,
    selectedDate,
    setSelectedDate,
    handleAddEntry,
    categories,
}) => {
    return (
        <div>
            <h2>Add Time Entry</h2>
            <div className={styles.container}>
                <div>
                    <label>Category:</label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Select category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Time:</label>
                    <input
                        type="number"
                        value={timeSpent}
                        onChange={(e) => setTimeSpent(e.target.value)}
                    />
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                </div>
                <button onClick={handleAddEntry}>Save</button>
            </div>
        </div>
    );
};

export default TimeEntryForm;