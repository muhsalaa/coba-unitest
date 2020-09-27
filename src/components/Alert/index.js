import React from 'react';
import clsx from 'clsx';
import '../../styles/main.css';

function Alert({ color, children, className, icon, ...resProps }) {
  const colors = {
    green: 'bg-green-200 text-green-700',
    red: 'bg-red-200 text-red-700',
  };

  const alertClass = clsx(
    'my-2 p-3 text-lg rounded-md flex items-center justify-center',
    colors[color],
    className
  );

  return (
    <div data-testid="qa-alert" className={alertClass} {...resProps}>
      {icon && React.createElement(icon, { className: 'mr-2 text-xl' })}
      {children}
    </div>
  );
}

Alert.defaultProps = {
  color: 'green',
  icon: null,
};

export default Alert;
