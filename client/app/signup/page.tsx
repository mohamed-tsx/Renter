const page = () => {
  return (
    <div className="flex items-center justify-center mt-20">
      <div className="border-2 border-blue-500 rounded-lg p-8 bg-gray-100 shadow-md">
        <form action="" className="space-y-4">
          <input
            type="text"
            className="border-2 p-3 w-full rounded-md"
            placeholder="First Name"
          />
          <input
            type="text"
            className="border-2 p-3 w-full rounded-md"
            placeholder="Last Name"
          />
          <input
            type="text"
            className="border-2 p-3 w-full rounded-md"
            placeholder="Username"
          />
          <input
            type="email"
            className="border-2 p-3 w-full rounded-md"
            placeholder="Email"
          />
          <input
            type="password"
            className="border-2 p-3 w-full rounded-md"
            placeholder="Password"
          />
          <div>
            <select
              name="userType"
              id="userType"
              className="border-2 p-3 w-full rounded-md"
            >
              <option value="renter">Renter</option>
              <option value="owner">Owner</option>
            </select>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
