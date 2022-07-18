export const PageLogin = ({message, jobSources, userIsLoggedIn, currentUser, currentUserIsInAccessGroup, handleLogoutButton, handleLoginButton, username, password, setUsername, setPassword}) => {
	return (
		<>
			<p>This is the Login page.</p>
			<div className="loggedInInfo">
				{userIsLoggedIn() && (
					<div>
						Logged in: {currentUser.firstName}{' '}
						{currentUser.lastName}
					</div>
				)}
			</div>
			<div className="info">
				{currentUserIsInAccessGroup('administrators') && (
					<div>info for administrators</div>
				)}
				{currentUserIsInAccessGroup('jobSeekers') && (
					<div>new job information for job seekers</div>
				)}
			</div>
			{userIsLoggedIn() ? (
				<>
					<p>There are {jobSources.length} job sources:</p>
					<ul>
						{jobSources.map((jobSource, i) => {
							return <li key={i}>{jobSource.name}</li>;
						})}
					</ul>
					<button className="logout" onClick={handleLogoutButton}>
						Logout
					</button>
				</>
			) : (
				<form className="login" onSubmit={handleLoginButton}>
					<div className="row">
						username:{' '}
						<input
							onChange={(e) => setUsername(e.target.value)}
							value={username}
							type="text"
						/>
					</div>
					<div className="row">
						password:{' '}
						<input
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							type="password"
						/>
					</div>
					<div className="row">
						<button>Login</button>
					</div>
					<div className="row">{message}</div>
				</form>
			)}
		</>
	);
};
