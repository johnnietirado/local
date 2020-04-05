import * as React from 'react';
import axios, { AxiosResponse } from 'axios';

const Index: React.FC<any> = (props) => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = React.useState('');

    const login = async (e) => {
        e.preventDefault();
        try {
            const response: AxiosResponse = await axios.post('http://localhost:4000/login', { email, password });
            setMessage(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <h1>Iniciar Sesión</h1>
            <form>
                <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <input placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <button type="submit" onClick={login}>Iniciar Sesión</button>
            </form>
            <p>{message}</p>
        </div>
    )
}

export default Index;