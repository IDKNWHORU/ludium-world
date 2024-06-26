package world.ludium.education.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

  private final Environment env;

  public CorsConfig(Environment env) {
    this.env = env;
  }

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
        .allowedOrigins(
            env.getProperty("ludium.world.admin.redirect-uri"),
            env.getProperty("ludium.world.provider.redirect-uri"),
            env.getProperty("ludium.world.contributor.redirect-uri"))
        .maxAge(3600)
        .allowCredentials(true);
  }
}
