"use client";

import {
  ClerkLoaded,
  SignedIn,
  SignInButton,
  UserButton,
  useUser
} from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form";
import { TrolleyIcon, PackageIcon } from "@sanity/icons";

function Header() {
  const { user } = useUser();

  // this feature is not available in free Clerk account
  // const createClerkPasskey = async () => {
  //   try {
  //     const response = await user?.createPasskey();
  //     console.log("Passkey created:", response);
  //   } catch (error) {
  //     console.error("Error creating passkey:", JSON.stringify(error, null, 2));
  //   }
  // };

  console.log("User:", user);

  return (
    <header className="flex flex-wrap justify-between items-center px-4 py-2">
      <div className="flex w-full flex-wrap justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer mx=auto sm:mx-0"
        >
          Shopr
        </Link>
        <Form
          action={"/search"}
          className="w-full sm:w-auto flex-1 sm:mx-4 mt-2 sm:mt-0"
        >
          <input
            type="text"
            name="query"
            placeholder="Search..."
            className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none border border-gray-300 max-w-4xl"
          />
        </Form>

        <div className="flex items-center space-x-2 mt-4 sm:mt-0 sm:flex-none">
          <Link
            href="/basket"
            className="flex-1 relative flex items-center justify-center sm:justify-start sm:flex-none bg-blue-500 hober:bg-blue-700 text-white px-4 py-2 font-bold space-x-2 rounded"
          >
            <TrolleyIcon className="w-6 h-6" />
            <span>My basket</span>
          </Link>

          {/* user area */}
          <ClerkLoaded>
            <SignedIn>
              {user && (
                <Link
                  href="/orders"
                  className="flex-1 relative flex items-center justify-center sm:justify-start sm:flex-none bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 font-bold space-x-2 rounded ml-2"
                >
                  <PackageIcon className="w-6 h-6" />
                  <span>My orders</span>
                </Link>
              )}
            </SignedIn>
            {/* // */}
            {user ? (
              <div className="flex items-center space-x-2">
                <UserButton />
                <div className="hidden sm:block text-xs">
                  <p className="text-gray-400">Welcome back</p>
                  <p className="font-bold">{user.firstName}</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal"></SignInButton>
            )}
            {/* this feature is not available in free Clerk account */}
            {/* {user?.passkeys?.length === 0 && (
              <button
                onClick={createClerkPasskey}
                className="animate-pulse bg-white hover:bg-blue-700 hover:text-white text-blue-500 px-4 py-2 space-x-2 rounded border-blue-300 border"
              >
                Create passkey
              </button>
            )} */}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
}
export default Header;
