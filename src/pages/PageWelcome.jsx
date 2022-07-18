export const PageWelcome = ({handleLogoutButton}) => {
	return (
		<>
			<p>Welcome to this site.</p>
			<button className="logout" onClick={handleLogoutButton}>
				Logout
			</button>
		</>
	);
};
