import React from 'react';

const WishTree = ({ wishes }) => {
    return (
        <div className="hero-tree">
            <img src="/Asset/christmas-tree.png" alt="Christmas Tree" />
            {wishes.map((wish, index) => (
                <div
                    key={index}
                    className={`wish-card color-${wish.color}`}
                    style={{ top: `${wish.top}%`, left: `${wish.left}%` }}
                    tabIndex={0}
                >
                    <span>{wish.message}</span>
                </div>
            ))}
        </div>
    );
};
export default WishTree;
