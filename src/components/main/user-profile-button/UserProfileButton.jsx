import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, ButtonBase, Typography } from "@mui/material";
import Cookies from "js-cookie";

const UserProfileButton = (props) => {
	const navigate = useNavigate();

	return (
		<ButtonBase
			onClick={() => navigate("/profile")}
			sx={{
				display: "flex",
				alignItems: "center",
				gap: "10px",
				borderRadius: "10px", // Set border radius to 10px
				padding: "8px",
				background: "transparent", // Set the normal background to transparent
				"&:hover": {
					background: "rgba(255, 255, 255, 0.2)", // Set hover background to slightly opaque for visibility
				},
			}}
		>
			<Avatar
				alt={props.profile.userName}
				src="/path-to-avatar.jpg"
				sx={{ width: 40, height: 40 }}
			/>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-end",
				}}
			>
				<Typography variant="subtitle1">{props.profile.username}</Typography>
				<Typography variant="caption">{`Level: ${props.userLevel}`}</Typography>
			</Box>
		</ButtonBase>
	);
};

export default UserProfileButton;
