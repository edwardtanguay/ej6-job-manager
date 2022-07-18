import { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';
import { NavLink, Routes, Route } from 'react-router-dom';
import { PageWelcome } from './pages/PageWelcome';
import { PageJobSources } from './pages/PageJobSources';
import { PageJobApplications } from './pages/PageJobApplications';
import { PageCv } from './pages/PageCv';
import { PageLogin } from './pages/PageLogin';
import { PageRegister } from './pages/PageRegister';

const backend_base_url = 'http://localhost:3045';

function App() {
	const [jobSources, setJobSources] = useState([]);
	const [currentUser, setCurrentUser] = useState({});
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');

	const userIsLoggedIn = () => {
		return currentUser.username !== 'anonymousUser';
		// return Object.keys(currentUser).length > 0;
	};

	const currentUserIsInAccessGroup = (accessGroup) => {
		if (currentUser.accessGroups) {
			return currentUser.accessGroups.includes(accessGroup);
		} else {
			return false;
		}
	};

	const getJobSources = () => {
		(async () => {
			setJobSources(
				(await axios.get(backend_base_url + '/job-sources')).data
			);
		})();
	};

	useEffect(() => {
		(async () => {
			const response = await fetch(backend_base_url + '/maintain-login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			});
			if (response.ok) {
				const data = await response.json();
				setCurrentUser(data.user);
				getJobSources();
			} else {
				const response = await fetch(backend_base_url + '/login', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						username: 'anonymousUser',
						password: 'anonymousUser123',
					}),
				});
				if (response.ok) {
					const data = await response.json();
					getJobSources();
					setCurrentUser(data.user);
					localStorage.setItem('token', data.token);
				} else {
					setMessage('bad login');
				}
			}
		})();
	}, []);

	const handleLoginButton = async (e) => {
		e.preventDefault();
		const response = await fetch(backend_base_url + '/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password }),
		});
		setUsername('');
		setPassword('');
		if (response.ok) {
			const data = await response.json();
			getJobSources();
			setCurrentUser(data.user);
			localStorage.setItem('token', data.token);
		} else {
			setMessage('bad login');
		}
	};

	const handleLogoutButton = () => {
		localStorage.removeItem('token');
		setCurrentUser({ username: 'anonymousUser' });
	};

	return (
		<div className="App">
			<>
				<h1>EJ2 Job Manager</h1>

				<nav>
					<NavLink to="/welcome">Welcome</NavLink>
					<NavLink to="/job-sources">Job Sources</NavLink> 
					<NavLink to="/job-applications">Job Applications</NavLink>
					<NavLink to="/cv">CV</NavLink>
					<NavLink to="/login">Login</NavLink> 
					<NavLink to="/register">Register</NavLink>
				</nav>

				<Routes>
					<Route path="/welcome" element={<PageWelcome handleLogoutButton={handleLogoutButton} />} />
					<Route path="/job-sources" element={<PageJobSources jobSources={jobSources} />} />
					<Route path="/job-applications" element={<PageJobApplications />} />
					<Route path="/cv" element={<PageCv />} />
					<Route path="/login" element={<PageLogin message={message} jobSources={jobSources} userIsLoggedIn={userIsLoggedIn} currentUser={currentUser} currentUserIsInAccessGroup={currentUserIsInAccessGroup} handleLogoutButton={handleLogoutButton} handleLoginButton={handleLoginButton} username={username} password={password} setUsername={setUsername} setPassword={setPassword}/>} />
					<Route path="/register" element={<PageRegister />} />
				</Routes>

			</>
		</div>
	);
}

export default App;
