import React from "react";

const BoardTableContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                {children}
            </tbody>
        </table>
    );
};

export default BoardTableContent;