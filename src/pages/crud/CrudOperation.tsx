import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import "../../styles/crud.css";
import { Button, message, Spin, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
// import { DebounceInput } from "react-debounce-input";
import { debounce } from "lodash";
import {button} from "../../Global/constants"

export default function CrudOperation() {
  const text = "Are you want to delete this user?";
  const [userValue, setuserValue] = useState("");
  const [users, setUsers] = useState<string[]>([]);
  const [isEditingMode, setisEditingMode] = useState(false);
  const [editDetails, seteditDetails] = useState(Object);
  const [buttonDisable, setbuttonDisable] = useState(false);
  const [loadingUsers, setloadingUsers] = useState(false);

  const handleChange = (event: any) => {
    setuserValue(event.target.value);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setloadingUsers(true);
    // fetch("https://jsonplaceholder.typicode.com/users")
    //   .then((response) => response.json())
    //   .then((res) => setUsers(res))
    //   .catch((error) => message.error(error));
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((result) => {
        setUsers(result.data);
        setloadingUsers(false);
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const Submit = () => {
    setbuttonDisable(true);
    if (userValue === "") {
      message.warn("please enter a valid user");
      setbuttonDisable(false);
      return;
    } else {
      let formValues = {
        name: userValue,
        email: "",
      };
      axios
        .post("https://jsonplaceholder.typicode.com/users", formValues)
        .then((result) => {
          setUsers((user) => [...user, result.data]);
          setuserValue("");
          message.success("user added successfully..");
          setbuttonDisable(false);
        });
    }
  };

  const deleteUser = (usr: any, index: any) => {
    axios
      .delete("https://jsonplaceholder.typicode.com/users/" + usr?.id)
      .then((result) => {
        if (index !== -1) {
          users.splice(index, 1);
          setUsers((usrs) => [...users]);
          message.success("user deleted successfully");
        }
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const updateUser = (usr: any, index: any) => {
    setisEditingMode(true);
    setuserValue(usr.name);
    seteditDetails(usr);
  };

  const edit = () => {
    setbuttonDisable(true);
    let formValues = {
      name: userValue,
      email: "",
    };
    axios
      .put(
        "https://jsonplaceholder.typicode.com/users/" + editDetails?.id,
        formValues
      )
      .then((result) => {
        var updateUser: any = users.map((user: any) => {
          if (user.id === editDetails.id) {
            user.name = result.data.name;
          }
          return user;
        });
        setUsers((users) => updateUser);
        message.success("User Updated Successfully....");
        setuserValue("");
        setisEditingMode(false);
        setbuttonDisable(false);
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const cancelEdit = () => {
    setuserValue("");
    setisEditingMode(false);
  };

  const search = debounce((event: any) => {
    if (event.target.value === "") {
      fetchUsers();
    } else {
      var mappedUsers: any = users
        .filter((usr: any) =>
          usr.name.match(new RegExp(event.target.value, "i"))
        )
        .map((user: any) => {
          setUsers(user);
          return user;
        });
      setUsers((user) => mappedUsers);
    }
  }, 1500);

  return (
    <div>
      <Navbar />
      <div className="crudHeading">Crud Operation</div>
      <div className="addInput">
        <input
          placeholder="add user"
          name="user"
          onChange={handleChange}
          value={userValue}
        />
        {!isEditingMode ? (
          <Button
            type="primary"
            danger
            onClick={Submit}
            disabled={buttonDisable}
            loading={buttonDisable}
          >
            {button.addButton}
          </Button>
        ) : (
          <>
            <Button
              type="primary"
              onClick={edit}
              disabled={buttonDisable}
              loading={buttonDisable}
            >
              {button.updateButton}
            </Button>
            <Button type="primary" onClick={cancelEdit}>
              {button.cancelButton}
            </Button>
          </>
        )}
      </div>
      <div className="userList">
        <h2>Users</h2>
      </div>
      <div className="addInput">
        <input placeholder="search user" onChange={search} />
        {/* <Button type="primary" shape="circle" icon={<SearchOutlined />}  /> */}
      </div>
      <div className="userList">
        {loadingUsers ? (
          <Spin />
        ) : (
          <ol>
            {users.map((usr: any, index) => (
              <li key={index} style={{ paddingTop: "0.3rem" }}>
                {usr.name}
                <Popconfirm
                  placement="right"
                  title={text}
                  onConfirm={() => deleteUser(usr, index)}
                  okText="Delete"
                  cancelText="Cancel"
                >
                   <DeleteOutlined
                  style={{ paddingLeft: "0.5rem", cursor: "pointer" }}
                />
                </Popconfirm>
                <EditOutlined
                  onClick={() => updateUser(usr, index)}
                  style={{ paddingLeft: "0.5rem", cursor: "pointer" }}
                />
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
