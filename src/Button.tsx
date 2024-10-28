type ButtonPropsType = {
	title: string
	onClick?:()=> void
	active?: boolean
}

export const Button = ({title, onClick, active}: ButtonPropsType) => {
	return (
		<button className={active ? 'activeFilter': ''} onClick={onClick}>{title}</button>
	)
}
