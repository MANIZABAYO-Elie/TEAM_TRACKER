
import React from "react";


//InputField props

interface InputFieldProps {
  label?: string;                
  name: string;                  
  value: string;                  
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  type?: string;                  
  placeholder?: string;          
  options?: string[];             
  className?: string;            
}

export default function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  options,
  className,
}: InputFieldProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="font-medium">{label}</label>}

      {options ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="border p-3 rounded-md w-full "
        >
          {options.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="border p-3 rounded-md w-full"
        />
      )}
    </div>
  );
}
