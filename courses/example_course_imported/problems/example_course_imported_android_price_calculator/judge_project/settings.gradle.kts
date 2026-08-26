if (System.getenv("GRADLE_RO_DEP_CACHE") != null) {
  gradle.startParameter.isOffline = true
}

pluginManagement {
  repositories {
    google()
    mavenCentral()
    gradlePluginPortal()
  }
}

dependencyResolutionManagement {
  repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
  repositories {
    google()
    mavenCentral()
  }
}

rootProject.name = "android-price-calculator"
include(":app")
