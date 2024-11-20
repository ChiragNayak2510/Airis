import React from 'react';

interface props {
    code: string
}

const CodeBlock : React.FC<props> = ({ code}) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(code)
          .then(() => {
            alert('Code copied to clipboard!');
          })
          .catch(err => {
            console.error('Failed to copy: ', err);
          });
      };
    
      return (
        <div className="relative bg-[#212121]  text-white p-4 rounded-lg overflow-auto">
          <pre className="whitespace-pre-wrap">
            <code>{code}</code>
          </pre>
          <button 
            onClick={handleCopy} 
            className="absolute top-2 right-2 bg-gray-200/10 text-white px-2 py-1 rounded hover:bg-blue-600 focus:outline-none"
          >
            Copy
          </button>
        </div>
      );
    };
export default CodeBlock;