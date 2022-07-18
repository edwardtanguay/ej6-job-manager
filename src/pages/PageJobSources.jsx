export const PageJobSources = ({ jobSources }) => {
	return (
		<>
			<p>There are {jobSources.length} job sources:</p>
			<ul>
				{jobSources.map((jobSource, i) => {
					return <li key={i}>{jobSource.name}</li>;
				})}
			</ul>
		</>
	);
};
