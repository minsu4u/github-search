import {
  Avatar,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Link,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGithubUserStore } from "../../store/githubUser";
import dayjs from "dayjs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useCallback } from "react";

function UserInfo() {
  const {
    user: {
      avatar_url,
      name,
      html_url,
      company,
      blog,
      loacation: loacationInfo,
      email,
      hireable,
      bio,
      public_repos,
      public_gists,
      followers,
      following,
      created_at,
      updated_at,
    },
    loading,
    getUser,
  } = useGithubUserStore();
  const { username } = useParams();
  useEffect(() => {
    getUser(username);
  }, [username, getUser]);

  const location = useLocation();
  const navigate = useNavigate();
  const onClickNavigateToList = useCallback(() => {
    if (!location.state) navigate("/");
    else {
      navigate({
        pathname: "/",
        search: !!location.state?.previous
          ? `?q=${location.state.q}&page=${location.state?.previous}`
          : `?q=${location.state?.q}`,
      });
    }
  }, [location.state, navigate]);

  if (loading) {
    return <CircularProgress sx={{ margin: "auto", marginTop: "200px" }} />;
  } else {
    return (
      <>
        <Button
          style={{ margin: "10px" }}
          onClick={onClickNavigateToList}
          startIcon={<ArrowBackIcon />}
        >
          Github User List 돌아가기
        </Button>
        <Card variant="outlined" sx={{ margin: "10px" }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Avatar
              alt={name}
              src={avatar_url}
              sx={{ width: "200px", height: "200px", margin: "auto" }}
            />
            <Typography variant="h4" sx={{ marginBottom: "50px" }}>
              {name}
            </Typography>
            <Button
              variant="contained"
              href={html_url}
              sx={{ marginBottom: "30px" }}
            >
              Github Page
            </Button>
            {bio ? (
              <Typography variant="subtitle1">자기소개 : {bio}</Typography>
            ) : null}
            {company ? (
              <Typography variant="subtitle1">Company : {company}</Typography>
            ) : null}
            {blog ? (
              <Typography variant="subtitle1">
                Blog : <Link href={blog}>{blog}</Link>
              </Typography>
            ) : null}
            {loacationInfo ? (
              <Typography variant="subtitle1">
                위치 : {loacationInfo}
              </Typography>
            ) : null}
            {email ? (
              <Typography variant="subtitle1">Email : {email}</Typography>
            ) : null}
            <Typography variant="subtitle1">
              고용가능 여부 : {hireable ? "예" : "아니오"}
            </Typography>
            <Typography variant="subtitle1">
              public repository : {public_repos}
            </Typography>
            <Typography variant="subtitle1">
              public gist 개수 : {public_gists}
            </Typography>
            <Typography variant="subtitle1">
              follower 수 : {followers}
            </Typography>
            <Typography variant="subtitle1">
              following 수 : {following}
            </Typography>
            <Typography variant="subtitle1">
              Github 생성일 : {dayjs(created_at).format("YYYY.MM.DD h:mm A")}
            </Typography>
            <Typography variant="subtitle1">
              Github 업데이트 : {dayjs(updated_at).format("YYYY.MM.DD h:mm A")}
            </Typography>
          </CardContent>
        </Card>
      </>
    );
  }
}

export default UserInfo;
