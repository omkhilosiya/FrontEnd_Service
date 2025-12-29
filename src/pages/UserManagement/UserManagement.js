import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import SubAgentForm from "./SubAgentForm";
import "./userManagement.css";
import { axiosPrivate } from "../../api/useAxiosPrivate";
import ChangePasswordForm from "./ChangePasswordForm";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [role, setRole] = useState(null);
  const [email , setEmail] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosPrivate.get(
        `/getallusers?page=${currentPage - 1}`
      );

      setUsers(res.data.content || []);
      setTotalPages(res.data.totalPages || 0);
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event) => {
    setCurrentPage(event.selected + 1);
    
  };

  return (
    <div className="user-page">
      <div className="header">
        <h2>User Management</h2>
        {/* <button
          className="primary-btn"
          onClick={() => {
            setEditUser(null);
            setOpenForm(true);
          }}
        >
          Create Subagent
        </button> */}
      </div>

      {/* {openForm && (
        <SubAgentForm
          editUser={editUser}
          onClose={() => setOpenForm(false)}
          refreshUsers={fetchUsers}
        />
      )} */}

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>ChangePassword & role</th>
                <th>userRoles</th>

              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td>
                    <span className={u.status ? "active" : "inactive"}>
                      {u.status ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td>
                    <button
                      className="change-btn"
                      onClick={() => {
                        setEmail(u.email);
                        setRole(u.roles)
                        setShowPasswordForm(true);
                      }}
                    >
                      Change
                    </button>
                  </td>
                  <td>{u.roles}</td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {totalPages > 1 && (
            <ReactPaginate
              previousLabel="Prev"
              nextLabel="Next"
              pageCount={totalPages}
              forcePage={currentPage - 1}
              onPageChange={handlePageChange}
              containerClassName="pagination"
              activeClassName="active-page"
              disabledClassName="disabled"
            />
          )}

          {showPasswordForm && (
          <ChangePasswordForm
            email={email}
            incomingRole={role}
            onClose={() => {
              setShowPasswordForm(false);
              setEmail(null);
            }}
            refreshUsers={fetchUsers}

          />
        )}

        </>
      )}
    </div>
  );
}
