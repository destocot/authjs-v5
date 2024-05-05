export default function Page() {
  return (
    <main>
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold">Auth.js Tutorial</h1>
          <p className="mt-4 text-lg">
            Learn how to implement authentication using auth.js in your
            application.
          </p>
        </div>
      </section>
      <section className="bg-primary-foreground text-primary">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold">Features</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded bg-primary-foreground p-6 text-primary shadow">
              <h3 className="text-xl font-semibold">Roles</h3>
              <p className="mt-4">
                Implement roles in your application to manage permissions and
                access control.
              </p>
            </div>
            <div className="rounded bg-primary-foreground p-6 text-primary shadow">
              <h3 className="text-xl font-semibold">Password Reset</h3>
              <p className="mt-4">
                Allow users to reset their password if they forget it.
              </p>
            </div>
            <div className="rounded bg-primary-foreground p-6 text-primary shadow">
              <h3 className="text-xl font-semibold">Verify Email</h3>
              <p className="mt-4">
                Verify user&apos;s email address to ensure they own the email
                they provided.
              </p>
            </div>
            <div className="rounded bg-primary-foreground p-6 text-primary shadow">
              <h3 className="text-xl font-semibold">OAuth</h3>
              <p className="mt-4">
                Implement OAuth providers like Google and GitHub for easy
                authentication.
              </p>
            </div>
            <div className="rounded bg-primary-foreground p-6 text-primary shadow">
              <h3 className="text-xl font-semibold">Credentials OAuth</h3>
              <p className="mt-4">
                Implement OAuth providers like Google and GitHub for easy
                authentication.
              </p>
            </div>
            <div className="rounded bg-primary-foreground p-6 text-primary shadow">
              <h3 className="text-xl font-semibold">Update Session</h3>
              <p className="mt-4">
                Update user&apos;s session to keep them logged in even after the
                browser is closed.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
