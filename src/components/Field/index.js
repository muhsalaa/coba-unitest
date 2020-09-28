import React from 'react';
import clsx from 'clsx';

export function Field({ error, label, readOnly, ...resProps }) {
  const inputClass = clsx(
    'h-12 border rounded w-full py-2 px-3 leading-tight focus:outline-none',
    !error && 'focus:border-blue-300',
    error && 'border-red-700',
    readOnly && 'bg-gray-100'
  );

  return (
    <div data-testid="qa-input-wrapper" className="mb-4">
      {label && (
        <div data-testid="qa-input-label" className="text-xl text-left">
          {label}
        </div>
      )}
      <input
        data-testid="qa-input-field"
        className={inputClass}
        readOnly={readOnly}
        {...resProps}
      />
      {error && (
        <span data-testid="qa-input-error" className="text-red-700">
          {error.message}
        </span>
      )}
    </div>
  );
}

Field.defaultProps = {
  type: 'text',
  label: false,
};
