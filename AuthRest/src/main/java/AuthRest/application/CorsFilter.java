package AuthRest.application;

import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.container.PreMatching;
import javax.ws.rs.ext.Provider;
import java.io.IOException;

    @Provider
    @PreMatching
    public class CorsFilter implements ContainerResponseFilter {
        private final Log logger = LogFactoryUtil.getLog(getClass());
        @Override
        public void filter(final ContainerRequestContext requestContext, final ContainerResponseContext cres)
                throws IOException {
            logger.info("Writing CORS headers");
            cres.getHeaders().add("Access-Control-Allow-Origin", "*"); // Update specific domains instead of giving to all
            cres.getHeaders().add("Access-Control-Allow-Headers", "Origin,Content-Type,Accept,Authorization,content-type");
            cres.getHeaders().add("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS,HEAD");
            //cres.getHeaders().add("Access-Control-Max-Age", "1209500");
        }
    }


