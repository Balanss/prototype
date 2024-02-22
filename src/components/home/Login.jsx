import  { useState } from 'react';


function Login({ setPassword, password, setCheck }) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform login logic here
        sessionStorage.setItem('name', name);
        sessionStorage.setItem('password', password);
        setCheck(true);
    };


    const sendData = async () => {
        const data = {
            key1: 'value1',
            key2: 'value2',
            route:'update',
            // other data you want to send
        };

        try {
            const response = await fetch('https://hook.us1.make.com/844sx51s5dq2qnn26l4tif39jfr0dddo', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify(data),
            });

            const text = await response.text();
            console.log(text);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-custom">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className='text-2xl mb-4 text-black'>Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block">
                        <span className='text-black'>Email:</span>
                        <input type="email" value={email} onChange={handleEmailChange} className="mt-1 p-2 text-black block w-full rounded-md  shadow-sm border-2 border-black" />
                    </label>
                    <label className="block text-black">
                        <span>Name:</span>
                        <input type="text" value={name} onChange={handleNameChange} className="mt-1 p-2 block w-full rounded-md  shadow-sm border-2 border-black" />
                    </label>
                    <label className="block text-black">
                        <span>Password:</span>
                        <input type="text" placeholder='' value={password} onChange={handlePasswordChange} className="mt-1 block w-full p-2 rounded-md  shadow-sm border-2 border-black" />
                    </label>
                    <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700">Login</button>

                </form>

            </div>

            {/* <button onClick={sendData}>
      Send Data
    </button> */}
        </div>
    );
}

export default Login;
