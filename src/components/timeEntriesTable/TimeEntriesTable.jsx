const TimeEntriesTable = ({ timeEntries, handleDeleteEntry, handleEditTime }) => {
    return (
        <div>
            <h2>Time Entries</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Time </th>
                            <th>Date</th>
                            <th>Action</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timeEntries.map((entry) => (
                            <tr key={entry.id}>
                                <td>{entry.category}</td>
                                <td>{entry.timeSpent}</td>
                                <td>{entry.date}</td>
                                <td>
                                    <button onClick={() => handleDeleteEntry(entry.id)}>
                                        Delete
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleEditTime(entry.id)}>Edit</button>{" "}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    );
};

export default TimeEntriesTable;
