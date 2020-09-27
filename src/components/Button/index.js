import React from 'react';
import clsx from 'clsx';

const colorTheme = {
  red: {
    bg: 'bg-red-600',
    bgHover: 'hover:bg-red-700',
  },
  blue: {
    bg: 'bg-blue-600',
    bgHover: 'hover:bg-blue-700',
  },
};

export function Button({
  children,
  onClick,
  className,
  color,
  disabled,
  block,
  icon,
  ...resProps
}) {
  const nc = colorTheme[color];

  const buttonClass = clsx(
    'text-base sm:text-lg font-fira font-medium py-1 px-2 md:py-2 md:px-4 rounded-md focus:outline-none flex items-center justify-center',
    !disabled && `${nc.bg} ${nc.bgHover} text-white`,
    disabled && 'bg-gray-500 cursor-not-allowed text-gray-200',
    block && 'w-full',
    className
  );

  return (
    <button
      data-testid="qa-button"
      onClick={onClick}
      disabled={disabled}
      className={buttonClass}
      {...resProps}
    >
      {icon && React.createElement(icon, { className: 'mr-2 text-2xl' })}
      {children}
    </button>
  );
}

Button.defaultProps = {
  icon: null,
  color: 'blue',
  disabled: false,
  onClick: () => {},
  className: '',
};
