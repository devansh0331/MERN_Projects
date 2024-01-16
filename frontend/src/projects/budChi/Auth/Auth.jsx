import React, { useContext, useEffect, useState } from "react";

import "./Auth.css";
import { UserContext } from "../../../UseContext";

import toast, { Toaster } from "react-hot-toast";

import { GiReceiveMoney } from "react-icons/gi";
import { HiPencilAlt } from "react-icons/hi";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { FiRefreshCcw } from "react-icons/fi";

import { json } from "react-router-dom";

function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [amount, setAmount] = useState("");
  const [amountDesc, setAmountDesc] = useState("");
  const [isDeposit, setIsDeposit] = useState(true);
  const [isWithdraw, setIsWithdraw] = useState(true);
  const [memory, setMemory] = useState("");

  const [expensepopup, setExpensePopup] = useState(false);
  const [diarypopup, setDiaryPopup] = useState(false);

  const { userInfo, setUserInfo } = useContext(UserContext);

  const [expenses, setExpenses] = useState([]);
  //   console.log(userInfo);

  const [toggleExpense, setToggleExpense] = useState(true);

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    fetch(
      `https://mern-projects.onrender.com/expenses/${userInfo.username}`
    ).then((res) => {
      res.json().then((res) => setExpenses(res));
    });
  }, [toggleExpense]);
  useEffect(() => {
    try {
      fetch("https://mern-projects.onrender.com/profile", {
        credentials: "include",
      }).then((response) =>
        response.json().then((userInfo) => {
          // setusername(userInfo.username);
          console.log(userInfo);
          setUserInfo(userInfo);
        })
      );
    } catch (error) {
      console.log(error);
    }
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const checkUser = await fetch(
        "https://mern-projects.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ username, password }),
          credentials: "include",
        }
      );

      const parsedUserMessage = await checkUser.json();
      // const parsedUserStatus = await checkUser.status();
      console.log(parsedUserMessage);

      if (checkUser.ok) {
        checkUser.json().then((userInfo) => {
          console.log(userInfo);
          setUserInfo(userInfo);
        });
        toast.success(parsedUserMessage.message);
        location.reload();
      }
      if (checkUser.status == 400 || checkUser.status == 401) {
        toast.error(parsedUserMessage);
      }

      if (checkUser.status == 500) {
        toast.warning(parsedUserMessage);
      }
    } catch (error) {
      toast.error("Failed to login !");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const createUser = await fetch(
        "https://mern-projects.onrender.com/signup",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ name, username, email, password }),
        }
      );

      const parsedCreateUser = await createUser.json();
      console.log(parsedCreateUser);

      if (createUser.status == 200) {
        // setUserInfo(parsedCreateUser.data);
        setIsSignUp(false);

        toast.success(parsedCreateUser.message);
      }

      if (createUser.status == 400 || createUser.status == 401) {
        toast.error(parsedCreateUser);
      }

      if (createUser.status == 500) {
        toast.warning(parsedCreateUser);
      }
    } catch (error) {
      toast.error("Failed to create account !");
    }
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    setDiaryPopup(false);
    setExpensePopup(!expensepopup);
  };
  const handleAddDiary = (e) => {
    e.preventDefault();
    setExpensePopup(false);
    setDiaryPopup(!diarypopup);
  };

  const handleDeposit = async (e) => {
    e.preventDefault();

    try {
      const holder = userInfo.username;
      console.log("withdraw" + isWithdraw + "  deposit" + isDeposit);
      const updateBalance = await fetch(
        "https://mern-projects.onrender.com/update-balance",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            username: holder,
            amount,
            deposit: true,
            withdraw: false,
          }),
        }
      );
      const parsedUpdateBalance = await updateBalance.json();
      console.log(updateBalance);

      if (updateBalance.status == 200) {
        const data = await fetch(
          "https://mern-projects.onrender.com/post-expense",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              amount,
              description: amountDesc,
              deposit: true,
              withdraw: false,
              holder,
            }),
          }
        );

        if (data.status == 200) {
          // toast.success(updateBalance.json());
          setToggleExpense(!toggleExpense);
          toast.success(parsedUpdateBalance);
          // location.reload();
        }
      }

      if (
        updateBalance.status == 400 ||
        updateBalance.status == 401 ||
        updateBalance.status == 500
      ) {
        toast.error(parsedUpdateBalance);
      }
    } catch (error) {
      toast.error("Failed to add money !");
    }
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();

    try {
      const holder = userInfo.username;
      console.log("withdraw" + isWithdraw + "  deposit" + isDeposit);
      const updateBalance = await fetch(
        "https://mern-projects.onrender.com/update-balance",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            username: holder,
            amount,
            deposit: false,
            withdraw: true,
          }),
        }
      );
      const parsedUpdateBalance = await updateBalance.json();
      console.log(updateBalance);

      if (updateBalance.status == 200) {
        const data = await fetch(
          "https://mern-projects.onrender.com/post-expense",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              amount,
              description: amountDesc,
              deposit: false,
              withdraw: true,
              holder,
            }),
          }
        );

        if (data.status == 200) {
          // toast.success(updateBalance.json());
          setToggleExpense(!toggleExpense);
          toast.success(parsedUpdateBalance);
          // location.reload();
        }
      }

      if (
        updateBalance.status == 400 ||
        updateBalance.status == 401 ||
        updateBalance.status == 500
      ) {
        toast.error(parsedUpdateBalance);
      }
    } catch (error) {
      toast.error("Failed to add money !");
    }
  };

  return (
    <div className="bg-container">
      <div className="inner-container">
        {userInfo.username ? (
          <div className="home">
            <div className="top">
              <span className="logo">BudChi</span>
              <div className="account-status">
                {/* <div>
                  <span>Deposit</span>

                  <p>1000</p>
                </div> */}
                <div>
                  <span>
                    {date.toDateString().split(" ")[2]}{" "}
                    {date.toDateString().split(" ")[1]} ,
                    {date.toDateString().split(" ")[0]}{" "}
                    {/* {date.toDateString().slice(0, 3)} */}
                  </span>

                  <p>{date.toTimeString().split(" ")[0]}</p>
                </div>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(userInfo);
                  }}
                >
                  <span>Current Balance</span>

                  <p>{userInfo.currentbalance}</p>
                </div>
              </div>
              <span className="welcome">
                "Welcome&nbsp;
                <p style={{ margin: "0", color: "yellow" }}>
                  {userInfo.username}"
                </p>{" "}
                &nbsp; &nbsp;
                <p
                  style={{
                    margin: "0",
                    background: "red",
                    padding: "0.3rem",
                    borderRadius: "0.5rem",
                    fontSize: "1rem",
                    height: "fit-content",
                    cursor: "Pointer",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    fetch("https://mern-projects.onrender.com/logout", {
                      method: "POST",
                      credentials: "include",
                    });
                    toast.success("Logged out successfully");
                    setUserInfo({});
                  }}
                >
                  Logout
                </p>
              </span>
            </div>
            <div className="mid">
              <div className="left">
                <div className="left-list">
                  <div className="add-expense" onClick={handleAddExpense}>
                    <GiReceiveMoney
                      style={{
                        color: "white",
                        fontSize: "1.5rem",
                        lineHeight: "0",
                      }}
                    />
                    &nbsp; Add Expense +
                  </div>
                  <div className="add-diary" onClick={handleAddDiary}>
                    {" "}
                    <HiPencilAlt
                      style={{
                        color: "white",
                        fontSize: "1.3rem",
                        lineHeight: "0",
                      }}
                    />
                    &nbsp; Add Special about you day +
                  </div>
                </div>
              </div>
              <div className="mid2">
                <div
                  className={
                    expensepopup || diarypopup
                      ? "account-input displayNone"
                      : "account-input"
                  }
                >
                  <form className="form quoteForm">
                    <span>Quote of the Day</span>
                    <br />
                    <span>Coming Soon</span>
                  </form>
                </div>
                <div
                  className={
                    expensepopup ? "account-input" : "account-input displayNone"
                  }
                >
                  <form className="form">
                    <p onClick={handleAddExpense}>x</p>
                    <span className="sub-title">New Transaction</span>
                    <input
                      type="number"
                      name=""
                      id=""
                      placeholder="Amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Purpose"
                      value={amountDesc}
                      onChange={(e) => setAmountDesc(e.target.value)}
                    />
                    <div>
                      <button
                        className="auth-button"
                        // value={0}
                        onClick={handleDeposit}
                      >
                        Deposit
                      </button>
                      <button
                        className="auth-button"
                        // value={1}
                        onClick={handleWithdraw}
                      >
                        Withdraw
                      </button>
                    </div>
                  </form>
                </div>
                <div
                  className={
                    diarypopup ? "account-input" : "account-input displayNone"
                  }
                >
                  <form className="form">
                    <p onClick={handleAddDiary}>x</p>
                    <span className="sub-title">
                      Enter your Memorable moment
                    </span>
                    {/* <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Won a medal"
                      value={memory}
                      onChange={(e) => setMemory(e.target.value)}
                    /> */}
                    <span style={{ color: "yellow", fontSize: "2rem" }}>
                      Coming Soon
                    </span>
                    {/* <input type="text" name="" id="" placeholder="Detail" /> */}
                    {/* <div>
                      <button className="auth-button">Save</button>
                    </div> */}
                  </form>
                </div>
              </div>
              <div className="right">
                <p onClick={(e) => setToggleExpense(!toggleExpense)}>
                  {/* <HiOutlineSwitchHorizontal /> */}
                  <FiRefreshCcw />
                </p>
                <span className="sub-title">Transaction History</span>
                <div className="data-boxes">
                  {expenses ? (
                    expenses == "" ? (
                      <div
                        className="data-box"
                        style={{ color: "yellow", cursor: "pointer" }}
                        onClick={(e) => setToggleExpense(!toggleExpense)}
                      >
                        Click here
                      </div>
                    ) : (
                      expenses.map((item, key) => {
                        return (
                          <div className="data-box" key={key}>
                            <div>
                              <p>{item.description}</p>
                              {item.deposit ? (
                                <p style={{ color: "lightgreen" }}>
                                  {" "}
                                  +{item.amount}
                                </p>
                              ) : (
                                <p style={{ color: "red" }}> -{item.amount}</p>
                              )}
                            </div>

                            <div>
                              <p style={{ color: "yellow" }}>
                                {item.postedAt.toString().split("T")[0]}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    )
                  ) : (
                    <div className="data-box" style={{ color: "yellow" }}>
                      No Transactions available
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="bottom">
              Created with ❤️ by&nbsp;
              <a href="" style={{ color: "white" }}>
                Devansh
              </a>
            </div>
          </div>
        ) : (
          <>
            {isSignUp ? (
              <form className="form">
                <span className="title">SignUp</span>
                <p className="tagline">Personalize your expenses</p>
                <input
                  type="text"
                  name=""
                  id=""
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Full Name"
                />
                <br />
                <input
                  type="text"
                  name=""
                  id=""
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  placeholder="Username"
                />
                <br></br>
                <input
                  type="text"
                  name=""
                  id=""
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Email"
                />
                <br />
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <br></br>
                <a className="forget-statement" href="">
                  Forget Password?
                </a>
                <br></br>
                <button className="auth-button" onClick={handleSignUp}>
                  Submit
                </button>
                <p className="switch-statement">
                  Already a holder?{" "}
                  <a onClick={(e) => setIsSignUp(false)}> Login</a>
                </p>
              </form>
            ) : (
              <form className="form">
                <span className="title">Login</span>
                <p className="tagline">Welcome back! Your data is safe...</p>
                <input
                  type="text"
                  name=""
                  id=""
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  placeholder="Username"
                />
                <br></br>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <br></br>
                <a className="forget-statement" href="">
                  Forget Password?
                </a>
                <br></br>
                <button className="auth-button" onClick={handleLogin}>
                  Submit
                </button>
                <p className="switch-statement">
                  New to BudChi?{" "}
                  <a onClick={(e) => setIsSignUp(true)}>
                    {" "}
                    Create Account for free
                  </a>
                </p>
              </form>
            )}
          </>
        )}
        <Toaster position="top-right" />
      </div>
    </div>
  );
}

export default Auth;
