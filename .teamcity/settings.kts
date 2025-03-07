version = "2024.12"

project {
    // Define a VCS root for your repository.
    vcsRoot(MyGitVcs)

    // Define a build configuration (build type)
    buildType(MyBuildPipeline)
}

// Git VCS root definition.
object MyGitVcs : GitVcsRoot({
    name = "Test Api Repo"
    url = "https://github.com/JeelGajera/test-apirepo-action.git"
    branch = "refs/heads/main"
    // Optionally, configure authentication here if needed.
})

// Build configuration that defines your build pipeline.
object MyBuildPipeline : BuildType({
    name = "Test Build Pipeline"

    vcs {
        root(MyGitVcs)
    }

    steps {
        // Step 1: Install dependencies using npm.
        script {
            name = "Install Dependencies"
            scriptContent = "npm i"
        }

        // Step 2: Build the project.
        script {
            name = "Build Project"
            scriptContent = "npm run build"
        }

        // Step 3: Run the Vulnerability Scan using your custom runner.
        // Use the 'custom' build step to invoke your runner.
        custom {
            name = "Vulnerability Scan"
            // runner type ID.
            type = "vulnerabilityScanRunner"
            // Add runner parameters as needed.
            param("deploymentUrl", "https://demo.com")
        }
    }

    // Optionally, add triggers, failure conditions, etc.
})
